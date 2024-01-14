type Params = {
  params: {
    id: string;
  };
};
export default function UserProfile({ params }: Params) {
  return (
    <div>
      <h1>
        UserProfile page{' '}
        <span className='bg-orange-400 text-black ml-2 p-4'>{params.id}</span>
      </h1>
    </div>
  );
}
