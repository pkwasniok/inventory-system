import { AppLayout } from '../../../components';
import { useRouter } from 'next/router';
import { api } from '../../../utils/api';



const OrganizationSettings = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  return (
    <AppLayout
      title="Ustawienia"
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      Ustawienia
    </AppLayout>
  );
}



export default OrganizationSettings;
