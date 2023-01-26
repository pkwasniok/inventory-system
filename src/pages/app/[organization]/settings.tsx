import { AppLayout } from '../../../components';
import { useRouter } from 'next/router';



const OrganizationSettings = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  return (
    <AppLayout returnHref={`/app/${query.organization}`} title="Ustawienia">

    </AppLayout>
  );
}



export default OrganizationSettings;
