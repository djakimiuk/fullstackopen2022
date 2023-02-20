import Part from "./Part";

const Content = ({ parts }) => (   
   <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <b>{`total of ${parts.reduce((sum, part) => { sum += part.exercises
    return sum}, 0)} exercises`}</b>
  </div>
);


export default Content;
