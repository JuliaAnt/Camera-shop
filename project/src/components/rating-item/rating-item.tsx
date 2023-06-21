type RatingItemProps = {
  id: number;
  rating: number;
}

function RatingItem({ id, rating }: RatingItemProps): JSX.Element {
  return (
    <svg id={id.toString()} width="17" height="16" aria-hidden="true">
      <use xlinkHref={id <= rating ? '#icon-full-star' : '#icon-star'}></use>
    </svg>
  );
}

export default RatingItem;
