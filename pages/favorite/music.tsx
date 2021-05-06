/*
 * @Author: Innei
 * @Date: 2020-09-17 14:02:24
 * @LastEditTime: 2021-02-11 15:28:57
 * @LastEditors: Innei
 * @FilePath: /web/pages/favorite/music.tsx
 * @Mark: Coding with Love
 */
import { PersonalPlayListType, PlayListType } from '@mx-space/extra'
import { SectionMusic } from 'components/SectionMusic'
import configs from 'configs'
import { NextPage } from 'next'
import { observer } from 'utils/mobx'
import { FavoriteNav } from '../../components/Navigation/nav'
import { Seo } from '../../components/SEO'
interface MusicProps {
  weekdata: PlayListType[]
  alldata: PlayListType[]
  playlist: PersonalPlayListType
  uid: number
}

const MusicView: NextPage<MusicProps> = (props) => {
  return (
    <main>
      <Seo title={`歌单`} openGraph={{ type: 'website' }} />
      <FavoriteNav index={0} />
      <SectionMusic
        {...{
          name: '周排行',
          src:
            'https://p3.music.126.net/4HGEnXVexEfBACKi7wbq8A==/3390893860854924.jpg',
          data: props.weekdata,
        }}
      />
      <SectionMusic
        {...{
          name: '总排行',
          src:
            'https://p1.music.126.net/xTCCKfCJuEh2ohPZDNMDLw==/19193074975054252.jpg',
          data: props.alldata,
        }}
      />
      <SectionMusic
        {...{
          name: props.playlist.name,
          src: props.playlist.coverImgUrl,
          data: props.playlist.data.slice(0, 10),
        }}
      />
    </main>
  )
}

MusicView.getInitialProps = async (ctx) => {
  const baseUrl = configs.url
  const prefixUrl =
    baseUrl ??
    // @ts-ignore
    (ctx.req?.connection?.encrypted ? 'https' : 'http') +
      '://' +
      ctx.req?.headers.host

  const { data } = await (await fetch(prefixUrl + '/api/netease/music')).json()

  return data as MusicProps
}

export default observer(MusicView)
