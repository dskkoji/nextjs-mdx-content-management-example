import { readFile } from 'fs/promises'
import { z, type ZodRawShape } from 'zod'
import { schemaValidator, dataFormatter, type DataFormat } from './utils'

export function defineDataFromFile<T extends ZodRawShape>({
  filePath,
  schema,
  format = "yaml",
}: {
  filePath: string;
  schema: T;
  format?: DataFormat;
}) {
  const { parser } = dataFormatter(format)
  const dataSchema = z.object({ id: z.string() }).extend(schema).passthrough()
  const validator = schemaValidator(dataSchema)

  async function getAll() {
    const file = await readFile(filePath, "utf8")
    const raw = parser(file)
    if (!Array.isArray(raw)) throw new Error("Data must be array")
    const data = raw.filter(validator)
    return data
  }

  async function get(key: keyof z.infer<typeof dataSchema>, value: unknown) {
    const data = await getAll()
    return data.find((datum) => datum?.[key] === value)
  }

  return {
    schema: dataSchema,
    get,
    getAll,
  }
}