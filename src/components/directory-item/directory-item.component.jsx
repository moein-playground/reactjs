import { useNavigate } from 'react-router-dom';
import {
  DirectoryItemContainer,
  BackgorundImage,
  Body,
} from './directory-item.style';

const DirectoryItem = ({ category }) => {
  const { title, id, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgorundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
