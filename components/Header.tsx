import Logo from '../components/Logo'

export default function Header() {

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Logo />
    </div>
  )
}