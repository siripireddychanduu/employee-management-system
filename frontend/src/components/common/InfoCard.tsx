interface Props {
  title: string;
  value: string | number;
}

export default function InfoCard({ title, value }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}