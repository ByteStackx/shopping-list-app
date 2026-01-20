import type { ShoppingListItem as ShoppingListItemType } from '../types';
import styles from './ShoppingListItem.module.css';

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function ShoppingListItem({ item, onEdit, onDelete }: ShoppingListItemProps) {
  return (
    <li className={styles['shopping-list-item']}>
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className={styles['item-image']}
        />
      )}
      <div className={styles['item-left']}>
        <h3 className={styles['item-name']}>{item.name}</h3>
        <span className={styles['item-quantity']}>x{item.quantity}</span>
        <span className={styles['item-category']}>{item.category}</span>
      </div>
      <div className={styles['item-middle']}>
        {item.notes && <span className={styles['item-notes']}>{item.notes}</span>}
      </div>
      <div className={styles['item-actions']}>
        <button className={styles['edit-button']} onClick={() => onEdit(item.id!)}>Edit</button>
        <button className={styles['delete-button']} onClick={() => onDelete(item.id!)}>Delete</button>
      </div>
    </li>
  );
}

export default ShoppingListItem;
