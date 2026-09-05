export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <section className="space-y-5">
        <p className="text-sm font-medium tracking-wide text-slate-600">
          Unofficial community prototype
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          PSU Hospital Kiosk Map
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-700">
          Kiosk location data and floor plans have not yet been populated. This
          site will help visitors find approved public kiosk locations once
          reviewed information is available.
        </p>
      </section>
    </main>
  );
}
