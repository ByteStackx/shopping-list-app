interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="category-filter"
    >
      <option value="All">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
