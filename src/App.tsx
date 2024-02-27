import MidArea from './components/MidArea';
import { PreviewArea } from './components/PreviewArea';
import TopBar from './components/TopBar';
import { ReactFlowProvider } from 'reactflow';

const App = (): JSX.Element => {
  return (
    <ReactFlowProvider>
      <div className='bg-blue-100 pt-6 font-sans'>
        <div className='pt-8'>
          <TopBar />
        </div>
        <div className='h-screen overflow-hidden flex flex-row'>
          <MidArea />
          <div className='w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2'>
            <PreviewArea />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;
