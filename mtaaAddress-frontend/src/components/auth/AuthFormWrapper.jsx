export default function AuthFormWrapper({ title, children }) {
  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-yellow-800 rounded-xl shadow-xl transition-colors duration-500">
      <h2 className="text-2xl font-bold text-center text-green-800 dark:text-yellow-300 mb-6 drop-shadow">
        {title}
      </h2>
      {children}
    </div>
  );
}
