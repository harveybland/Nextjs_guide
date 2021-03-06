import { GetCharacterResults, Character } from '../../types';
import Image from 'next/image';
import ImageLoader from '../../imageLoader';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();

  return (
    <div>
      <h1>{character.name}</h1>
      <Image
        loader={ImageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width='200'
        height='200'
      />
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
