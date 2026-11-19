import React from "react";

export default function ContentPage() {
  const [items, setItems] = React.useState<Array<{
    id: string;
    title: string;
    subtitle: string;
    type: string;
    createdAt: string;
  }>>([]);

  // Fetch items
  React.useEffect(() => {
    const mockItems = [
      {
        id: "1",
        title: "About Dahab Hostel",
        subtitle: "Family run since 1998",
        type: "page",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        title: "Tour Policies",
        subtitle: "Cancellation and refund policies",
        type: "policy",
        createdAt: "2024-02-20",
      },
    ];
    setItems(mockItems);
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-ink-heading mb-6">
        Content Management
      </h2>

      {/* Add Item Form */}
      <div className="mb-6 p-4 rounded-xl border border-border">
        <h3 className="font-medium text-ink-heading mb-4">Add New Item</h3>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const newItem = {
              id: Date.now().toString(),
              title: (e.target as any).title.value,
              subtitle: (e.target as any).subtitle.value,
              type: (e.target as any).type.value,
              createdAt: new Date().toISOString().split("T")[0],
            };
            setItems((prev) => [...prev, newItem]);
            ;(e.target as any).reset();
          }}
        >
          <div>
            <label className="block text-sm text-ink-muted mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-brand/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-ink-muted mb-2">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-sm text-ink-muted mb-2">Type</label>
            <select
              name="type"
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-brand/20"
            >
              <option value="tour">Tour</option>
              <option value="page">Page</option>
              <option value="policy">Policy</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:col-span-1 mt-4 px-4 py-2 bg-brand text-white rounded-md font-medium hover:bg-brand/90 transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-ink-muted text-sm">No items yet</p>
        ) : (
          <div>{items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-border hover:transition-colors hover:bg-surface/50"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-ink-heading">{item.title}</h4>
                <span className="text-xs text-ink-muted">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>
              <p className="text-sm text-ink-muted line-clamp-2">{item.subtitle}</p>
              <div className="flex gap-2">
                <button className="text-brand hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}</div>
        )}
      </div>
    </section>
  );
}