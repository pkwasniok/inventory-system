import { AppLayout } from '../../../components';
import { api } from '../../../utils/api';
import { useRouter } from 'next/router';



const Settings= () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  return (
    <AppLayout
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      Organization dashboard
    </AppLayout>
  );
}



export default Settings;
