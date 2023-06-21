import { RATINGS_REQUEST } from '../../consts';
import RateRequestItem from '../rate-request-item/rate-request-item';

type RateRequestListProps = {
  isDisabledForm: boolean;
  selectedRate: number;
  onChange: (rate: number) => void;
}

function RateRequestList({ isDisabledForm, selectedRate, onChange }: RateRequestListProps): JSX.Element {
  return (
    <div className="rate__group">
      {RATINGS_REQUEST.map((rateItem) => <RateRequestItem key={rateItem.value} rating={rateItem.value} title={rateItem.title} isDisabledForm={isDisabledForm} selectedRate={selectedRate}onChange={onChange} />)}
    </div>
  );
}

export default RateRequestList;
