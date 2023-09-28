import "./records.scss";

interface IRecords {
  service: string;
  specialist: string;
  date: string;
}

const Records = (props: IRecords) => {
  return (
    <div className="record">
      <span className="record__service">Service: {props.service} </span>
      <span className="record__specialist">Specialist: {props.specialist}</span>
      <span className="record__date">Date: {props.date}</span>
    </div>
  );
};

export default Records;
