import { useFloating, useHover, useInteractions, offset, flip, shift, useDismiss } from '@floating-ui/react';
import { useState } from 'react';
import type { JobTypeList } from '@/@types/jobs';

interface JobTypeTooltipProps {
  item: JobTypeList;
}

export default function JobTypeTooltip({ item }: JobTypeTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()]
  });

  const hover = useHover(context, {
    delay: { open: 300, close: 500 },
    restMs: 40
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss]);

  const allTenChiTiet = item.dsNhomChiTietLoai.flatMap((nhom) =>
    nhom.dsChiTietLoai.map((chiTiet) => chiTiet.tenChiTiet)
  );

  const midPoint = Math.ceil(allTenChiTiet.length / 2);
  const leftColumn = allTenChiTiet.slice(0, midPoint);
  const rightColumn = allTenChiTiet.slice(midPoint);

  const isEmpty = allTenChiTiet.length === 0;

  return (
    <div className='relative'>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className='text-sm font-medium text-[#7b7b7b] hover:text-[#1dbf73] hover:cursor-pointer transition-colors duration-200'
      >
        {item.tenLoaiCongViec}
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className='z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[400px]'
        >
          {isEmpty ? (
            <div className='flex items-center justify-center h-20 text-gray-400 text-base font-semibold select-none'>
              empty
            </div>
          ) : (
            <div className='flex gap-8'>
              <div className='flex-1'>
                {leftColumn.map((tenChiTiet, index) => (
                  <div
                    key={index}
                    className='text-sm text-gray-700 hover:text-[#1dbf73] hover:cursor-pointer py-2 transition-colors duration-150'
                  >
                    {tenChiTiet}
                  </div>
                ))}
              </div>

              <div className='flex-1'>
                {rightColumn.map((tenChiTiet, index) => (
                  <div
                    key={index}
                    className='text-sm text-gray-700 hover:text-[#1dbf73] hover:cursor-pointer py-2 transition-colors duration-150'
                  >
                    {tenChiTiet}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
