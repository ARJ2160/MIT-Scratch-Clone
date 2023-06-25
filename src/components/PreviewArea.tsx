import CatSprite from './CatSprite';

export const PreviewArea = () => {
  return (
    <div id='preview' className='flex-none h-screen w-full overflow-y-auto p-2'>
      <CatSprite />
    </div>
  );
};
