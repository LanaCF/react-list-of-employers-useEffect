import { EmployerItem } from ".";
import "./EmployerList.css";

export const EmployerList = (props) => {
  const { data, setDelEmployer, setEditEmployer } = props;

  return (
    <ul className="employer-list">
      {
        data.map((item, index) => (
          <EmployerItem
            key={ item.id }
            item={ item } 
            index={ index }
            setDelEmployer={ setDelEmployer }
            setEditEmployer={ setEditEmployer }
          />
        ))
      }
    </ul>
  );
};