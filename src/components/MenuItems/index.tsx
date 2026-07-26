import { Link, useRouter } from '@tanstack/react-router';

const menuCategories = [
  { id: 1, items: ['Casual', 'Esporte', 'Moderno', 'Futurista'] },
  { id: 2, items: ['Masculino', 'Feminino', 'Outlet'] },
];

const menuAbout = [
  { id: 1, item: 'Nossas Lojas', link: '/our-stores' },
  { id: 2, item: 'Sobre', link: '/about' },
];

export const MenuItems = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-8">
      {menuCategories.map(({ id, items }) => (
        <nav key={id}>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item}>
                <button
                  className="font-medium hover:text-text-tertiary transition-colors text-xl"
                  onClick={() =>
                    router.navigate({
                      to: '/products/category/$category',
                      params: {
                        category: item.toLowerCase(),
                      },
                    })
                  }
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ))}
      <nav>
        <ul className="flex flex-col gap-4">
          {menuAbout.map(({ id, item, link }) => (
            <li key={id}>
              <Link
                to={link}
                className="font-medium hover:text-text-tertiary transition-colors text-xl"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
