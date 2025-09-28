export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 p-6">
      <nav>
        <ul className="space-y-2 text-sm font-medium text-neutral-700">
          <li className="p-2 rounded-md hover:bg-neutral-100 hover:text-primary-600 cursor-pointer transition">
            Dashboard
          </li>
          <li className="p-2 rounded-md hover:bg-neutral-100 hover:text-primary-600 cursor-pointer transition">
            Tasks
          </li>
        </ul>
      </nav>
    </aside>
  );
}
