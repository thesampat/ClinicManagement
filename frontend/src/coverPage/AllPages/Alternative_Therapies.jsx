import { useParams } from 'react-router-dom';

export const ThearapyPackage = () => {
  const { threapyType } = useParams();
  return (
    <div className="p-20">
      <h1 className="text-5xl font-bold">{threapyType}</h1>
    </div>
  );
};
