import { useParams } from 'react-router-dom';

export const TreatmentPackage = () => {
  const { treatmentType } = useParams();
  return (
    <div className="p-20">
      <h1 className="text-5xl font-bold">{treatmentType}</h1>
    </div>
  );
};
