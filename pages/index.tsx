import Table from '@/components/common/Table';
import TableColumn from '@/components/common/TableColumn';
import usePagination from '@/hooks/usePagination';
import Path from '@/types/Path';
import Post from '@/types/Post';
import Link from 'next/link';

const tableHeaders = [
  { id: 0, title: '' },
  { id: 1, title: 'Title' },
  { id: 2, title: 'Body' },
];

type Props = {
  posts: Post[];
};

const Home = ({ posts }: Props) => {
  const { goNextPage, goPrevPage, currentData, totalPages, currentPage } = usePagination({
    data: posts,
    pageSize: 5,
  });

  return (
    <main>
      <Table title='Blog Posts' headers={tableHeaders}>
        {currentData.map((post) => (
          <tr key={post.id}>
            <TableColumn className='w-1/12 px-0 py-0'>
              <Link
                className='w-full block hover:bg-green-400 px-2 py-2'
                href={`${Path.Posts}/${post.id}`}
              >
                {post.id}
              </Link>
            </TableColumn>
            <TableColumn className='w-5/12'>{post.title}</TableColumn>
            <TableColumn className='w-6/12'>
              <p className='max-w-xs truncate text-ellipsis'>{post.body}</p>
            </TableColumn>
          </tr>
        ))}

        {/* Table pagination */}
        <tr>
          <td className='w-[100%]' colSpan={3}>
            <div className='flex gap-5 justify-end py-2 px-2'>
              <button
                className='rounded-none bg-slate-400 px-5 py-2 text-white hover:bg-slate-700 disabled:opacity-50'
                onClick={goPrevPage}
                disabled={currentPage === 1}
              >
                prev
              </button>
              <button
                className='rounded-none bg-slate-400 px-5 py-2 text-white hover:bg-slate-700 disabled:opacity-50'
                onClick={goNextPage}
                disabled={currentPage === totalPages}
              >
                next
              </button>
            </div>
          </td>
        </tr>
      </Table>
    </main>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseJson = await response.json();

  return {
    props: {
      posts: responseJson,
    },
  };
}

export default Home;
