import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { User, UserUpdateRequest } from '@/@types/user';
import userApi from '@/apis/user.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UserEditModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserEditModal({ user, isOpen, onClose }: UserEditModalProps) {
  const [formData, setFormData] = useState<UserUpdateRequest>({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    gender: user.gender,
    role: user.role,
    skill: user.skill,
    certification: user.certification
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (data: UserUpdateRequest) => userApi.updateUser(user.id, data),
    onSuccess: () => {
      toast.success('Information updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
      onClose();
    },
    onError: () => {
      toast.error('An error occurred while updating information!');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skill.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skill: [...prev.skill, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !formData.certification.includes(newCertification.trim())) {
      setFormData((prev) => ({
        ...prev,
        certification: [...prev.certification, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certification: prev.certification.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Edit Information</h2>
          <Button variant='outline' onClick={onClose}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <Input
                type='email'
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Birthday</label>
              <Input
                type='date'
                value={formData.birthday}
                onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              checked={formData.gender}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, gender: checked }))}
            />
            <label className='text-sm font-medium'>Male</label>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Skills</label>
            <div className='flex gap-2 mb-2'>
              <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder='Add new skill' />
              <Button type='button' onClick={addSkill} variant='outline'>
                Add
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {formData.skill.map((skill, index) => (
                <div
                  key={index}
                  className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1'
                >
                  {skill}
                  <button
                    type='button'
                    onClick={() => removeSkill(index)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Certifications</label>
            <div className='flex gap-2 mb-2'>
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder='Add new certification'
              />
              <Button type='button' onClick={addCertification} variant='outline'>
                Add
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {formData.certification.map((cert, index) => (
                <div
                  key={index}
                  className='bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1'
                >
                  {cert}
                  <button
                    type='button'
                    onClick={() => removeCertification(index)}
                    className='text-green-600 hover:text-green-800'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
