import Table from '@/components/common/Table';
import TableColumn from '@/components/common/TableColumn';
import Path from '@/types/Path';
import Post from '@/types/Post';
import Link from 'next/link';

const tableHeaders = [
  { id: 0, title: '' },
  { id: 1, title: 'Title' },
  { id: 2, title: 'Body' },
];

type Props = {
  post: Post;
};

const PostDetail = ({ post }: Props) => {
  return (
    <>
      <Table title='Post Detail' headers={tableHeaders}>
        <tr>
          <TableColumn className='w-1/12'>{post.id}</TableColumn>
          <TableColumn className='w-5/12'>{post.title}</TableColumn>
          <TableColumn className='w-6/12'>
            <p className='max-w-[100%]'>{post.body}</p>
          </TableColumn>
        </tr>
      </Table>

      <Link
        href={Path.Home}
        className='mb-5 block bg-slate-400 w-2/12 py-2 px-4 text-center text-white mt-10 hover:bg-slate-700'
      >
        Return to the main table
      </Link>
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseJson: Post[] = await response.json();

  const allowedPaths = responseJson.map((post) => ({ params: { id: post.id.toString() } }));

  return {
    paths: allowedPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
  const responseJson: Post = await response.json();

  return {
    props: {
      post: responseJson,
    },
  };
}

export default PostDetail;
