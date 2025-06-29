import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export function JobTypeReview() {
  const ratings: { [key: number]: { percent: string; count: number } } = {
    5: { percent: '81%', count: 27 },
    4: { percent: '9.5%', count: 3 },
    3: { percent: '0%', count: 0 },
    2: { percent: '0%', count: 0 },
    1: { percent: '0%', count: 0 },
    0: { percent: '9.5%', count: 3 }
  };

  return (
    <>
      <div className='flex items-center justify-between gap-2 mb-5'>
        <div className='flex items-center gap-2 mb-2 mt-2'>
          <h2 className='text-2xl font-medium'>33 Reviews</h2>
          <p>{'⭐'.repeat(5)} 5</p>
        </div>
        <div className='flex items-center gap-2 mb-2 mt-2'>
          <p>
            Sort By <span className='font-bold'>Most relevant</span>
          </p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      <div className='flex justify-between gap-2 mb-1 mt-2'>
        <div className='w-[50%] mr-3'>
          {[5, 4, 3, 2, 1, 0].map((star, i) => (
            <div key={i} className='flex items-center justify-baseline gap-2 mb-1 mt-2'>
              <p className='text-blue-600'>{star} Stars</p>
              <div className='relative bg-[#E4E6E7] h-3 w-70 rounded'>
                <div
                  className='absolute top-0 left-0 h-3 bg-[#FCB144] rounded'
                  style={{ width: ratings[star].percent }}
                ></div>
              </div>
              <p className='text-blue-500'>({ratings[star].count})</p>
            </div>
          ))}
        </div>

        <div className='w-[50%] ml-3'>
          <div className='flex items-center justify-between gap-2 mb-1 mt-2'>
            <p className='font-bold'>Rating Breakdown</p>
            <p></p>
          </div>
          <div className='flex items-center justify-between gap-2 mb-1 mt-2'>
            <p className='text-gray-500'>Seller communlcation level</p>
            <p>5{'⭐'.repeat(1)}</p>
          </div>
          <div className='flex items-center justify-between gap-2 mb-1 mt-2'>
            <p className=' text-gray-500'>recommend to a friend</p>
            <p>5{'⭐'.repeat(1)}</p>
          </div>
          <div className='flex items-center justify-between gap-2 mb-1 mt-2'>
            <p className=' text-gray-500'>Service as descrlbed</p>
            <p>5{'⭐'.repeat(1)}</p>
          </div>
        </div>
      </div>
      <div className='mt-5 border-b-2'>
        <h2 className='text-2xl font-medium'>Filters</h2>
        <div className='flex items-center gap-2 mb-2 mt-2'>
          <p>
            Industry <span className='font-bold'>All Industries</span>
          </p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
    </>
  );
}
