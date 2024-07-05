import NextLink from 'next/link'
import  { VStack, PageHeader } from '../../components'
import { categories } from '../../content'

async function Page() {
  const allCategories = await categories.getAll()

  return (
    <>
      <PageHeader title="Categories" />
      <VStack>
        {allCategories.map((data) => (
          <article key={data.id}>
            <h1>
              <NextLink href={`/categories/${data.id}`}>
                {data.name}
              </NextLink>
            </h1>
            <p>{data.description}</p>
          </article>
        )) }</VStack>   
    </>
  )
}


export default Page