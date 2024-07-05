
import { Post, VStack, PageHeader } from "@/components";
import { post } from "@/content";

async function Page() {
  const allPosts = await post.getAll();

  return (
    <>
      <PageHeader title="Post" />
      <VStack>
        {allPosts
          .sort(
            (a, b) =>
              b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
          )
          .map((data) => (
            <Post key={data.href} {...data} />
          ))}
      </VStack>
    </>
  );
}

export default Page;
