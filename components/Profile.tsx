import { Post } from '@types';
import FeedCard from './FeedCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type ProfileProps = {
  name: string;
  desc: string;
  data: any;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
};

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <div className="container py-10">
        <h1 className="ml-2 mb-4 text-4xl font-bold text-left">
          {name}的个人主页
        </h1>
        <p className="ml-2 mb-4 text-lg text-black/50">{desc}</p>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="12px">
            {data.map((post: any) => (
              <FeedCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
};

export default Profile;
