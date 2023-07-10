import { IconProps } from '../../types/types';

const Icon = ({ name, size, className }: IconProps): JSX.Element => {
  if (name === 'flag') {
    return (
      <svg
        width={size.toString() + 'px'}
        height={size.toString() + 'px'}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5'
        />
      </svg>
    );
  }
  if (name === 'undo') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
        />
      </svg>
    );
  }
  if (name === 'redo') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3'
        />
      </svg>
    );
  } else if (name === 'stop') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          fillRule='evenodd'
          d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
          clipRule='evenodd'
        />
      </svg>
    );
  } else if (name === 'play') {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
        />
      </svg>
    );
  } else
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-6 h-6` + ' ' + className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
        />
      </svg>
    );
};

export default Icon;
