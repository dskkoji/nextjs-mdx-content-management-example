import { Author, VStack, PageHeader } from '../../components'
import { author } from '../../content'

async function Page() {
  const allAuthors = await author.getAll()
  return (
    <>
      <PageHeader title="Author" />
      <VStack>
        {allAuthors.map((data) => (
          <Author key={data.id} {...data} />
        ))}
      </VStack>
    </>
  )
}

export default Page