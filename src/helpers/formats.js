export const formatPhone = (phone) => (
  phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
);
