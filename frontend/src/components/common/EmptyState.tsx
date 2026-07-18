interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-6xl mb-4">📂</div>

      <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>

      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}
