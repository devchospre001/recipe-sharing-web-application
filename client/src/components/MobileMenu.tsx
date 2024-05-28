// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuItem = (props: any) => {
  return <li className={props.className}>{props.tag}</li>;
};

export default MenuItem;
