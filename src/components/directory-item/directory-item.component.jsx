import {
  DirectoryItemContainer,
  BackgorundImage,
  Body,
} from './directory-item.style';

const DirectoryItem = ({ imageUrl, title }) => {
  return (
    <DirectoryItemContainer>
      <BackgorundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
