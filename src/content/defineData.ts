import { readdir, readFile } from 'fs/promises'
import * as path from 'path'
import { z, type ZodRawShape } from 'zod'
import { dataSchemaValidator, dataFormatter, type DataFormat } from './utils'

export function defineData<T extends ZodRawShape>({
  contentPath,
  schema,
  format = "yaml"
}: {
  contentPath: string;
  schema: T;
  format?: DataFormat;
}) {
  const { extensions, parser } = dataFormatter(format)
  const dataSchema = z.object({ id: z.string() }).extend(schema).passthrough()
  const validator = dataSchemaValidator(dataSchema)

  async function getAll(): Promise<z.infer<typeof dataSchema>[]> {
    const filesInDir = await readdir(contentPath, {
      encoding: 'utf8',
      recursive: true,
    })
    const files = filesInDir.filter((fileName) =>
      extensions.some((ext) => new RegExp(`.${ext}$`).test(fileName))
    )
    const collection = (
      await Promise.all(
        files.map(async (filename) => {
          const absolutePath = path.join(contentPath, filename)
          const file = await readFile(absolutePath, "utf8")
          const datum = parser(file)
          return {
            data: { id: filename.replace(/\.[^/.]+$/, ""), ...datum },
            filename
          }
        })
      )
    )
    .filter(validator)
    .map(({ data }) => data)

    return collection
  }

  async function get(
    key: keyof z.infer<typeof dataSchema>,
    value: unknown,
  ): Promise<z.infer<typeof dataSchema> | undefined> {
    const data = await getAll()
    return data.find((datum) => datum?.[key] === value)
  }

  return {
    schema: dataSchema,
    get,
    getAll,
  }
}
