export default function AddComment() {
  return (
    <div className='container'>
      <div className='flex flex-col gap-4 p-4 bg-white rounded shadow-md mx-auto'>
        <textarea
          className='border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
          rows={4}
          placeholder='Add your comment...'
        />
        <button
          type='submit'
          className='self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
