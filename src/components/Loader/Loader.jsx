import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrapper>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderWrapper>
  );
};

export default Loader;
