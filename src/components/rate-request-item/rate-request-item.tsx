type RateRequestItemProps = {
  rating: number;
  title: string;
  isDisabledForm: boolean;
  selectedRate: number;
  onChange: (rate: number) => void;
}

function RateRequestItem({ rating, title, isDisabledForm, selectedRate, onChange }: RateRequestItemProps): JSX.Element {
  const checked = Boolean(rating === selectedRate);

  return (
    <>
      <input
        key={rating}
        data-testid={`rate-input-${rating}`}
        className="visually-hidden"
        id={`star-${rating}`}
        name="rate"
        type="radio"
        value={rating}
        disabled={isDisabledForm}
        checked={checked}
        onChange={() => onChange(rating)}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating}`}
        title={title}
      >
      </label>
    </>
  );
}

export default RateRequestItem;
