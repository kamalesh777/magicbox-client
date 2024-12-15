import routesObj from '@/constants/ApiConstant'
import PlayCard from '@/modules/play';
import { fetchServerSideData } from '@/utils/fetchServerSideData '
import { auth } from '@clerk/nextjs/server';

const PlayPage = async () => {
  const { userId } = await auth();

  let data;

  if (userId) {
    try {
      const res = await fetchServerSideData(routesObj["except-me"]);

      if (res?.success) {
        data = res?.result;
      } else {
        data = []
      }
    } catch (err) {
      console.log("=====error in play page", err)
    }
  }

  return <PlayCard data={data} />
}

export default PlayPage