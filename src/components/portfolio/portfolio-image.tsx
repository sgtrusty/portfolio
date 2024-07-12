import Image from 'next/image';
import styles from './styles.module.scss';

interface IMetaData {
    name: string;
    slug: string;
}

const PortfolioImage =   (meta: IMetaData) => {
    return (
    <Image
        src={`/images/projects/${meta.slug}/cover.jpg`}
        width={1280}
        height={832}
        alt={meta.name}
        className={`${styles.portfolio_image} my-12 rounded-lg`}
    />
    );
  };
  
  export default PortfolioImage;