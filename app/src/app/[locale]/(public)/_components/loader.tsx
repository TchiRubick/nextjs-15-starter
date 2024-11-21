export const Loader = () => (
  <div
    id='loading-screen'
    className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white opacity-75'
  >
    <div className='h-12 w-12 animate-spin rounded-full border-8 border-solid border-slate-900 border-t-transparent' />
  </div>
);
