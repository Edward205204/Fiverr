import { baseSchema } from '@/utils/rules';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const searchFormSchema = baseSchema.pick({
  search: true
});

export default function useInputSearch() {
  const { register, handleSubmit } = useForm<{ search?: string }>({
    resolver: zodResolver(searchFormSchema)
  });
  return { register, handleSubmit };
}
