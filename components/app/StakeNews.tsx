const StakeNews = ({children} : React.PropsWithChildren) => {
    return (
        <div className="flex h-4/5 w-auto items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg bg-purple-500 bg-opacity-10 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block">Stake to earn more,</span>
                  <span className="block">with privileges !</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-200">
                  Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla
                  nec.
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 shadow hover:bg-indigo-50"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="mb-8">
            {/* <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1"> */}
              {/* <img
                className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg"
                alt="App screenshot"
              /> */}
                {children}
            </div>
          </div>
        </div>
        </div>
    )
}

export default StakeNews;