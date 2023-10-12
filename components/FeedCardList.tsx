import FeedCard from './FeedCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type FeedCardListProps = {
  data: any;
  handleTagClick: (tag: string) => void;
};

const FeedCardList = ({ data, handleTagClick }: FeedCardListProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
    >
      <Masonry gutter="12px">
        {data.map((post: any) => (
          <FeedCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default FeedCardList;
