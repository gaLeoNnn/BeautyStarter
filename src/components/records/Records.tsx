import "./records.scss";

interface IRecords {
  services: string;
  specialist: string;
  date: Date;
}

const Records = (props: IRecords) => {
  return (
    <div className="record">
      <span className="record__service">Service: Manicure </span>
      <span className="record__specialist">Specialist: Olga</span>
      <span className="record__date">Date: DD/MM/YYYY HH:mm</span>
    </div>
  );
};

export default Records;
