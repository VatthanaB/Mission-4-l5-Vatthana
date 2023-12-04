function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse "
          >
            <img
              className="w-12 h-12 rounded-full mr-3"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAkFBMVEX///+9GkS5ADK6ADe8FEG6ADW8Dz+7ADq7Bjz//f65ADC7CT3MXnb99vjip7P14OT46OzScYbVfI/ksrzAIkvy2t/57fDuytLDNFfkrbnIUWrfnqzTdorrw8zmtb/BLFHPaH7ITGjvz9bZjZ3FQ2DMW3Xgoa/DPVq4ACvou8TBNFTAKU7WhZXakJ/Qa4G2ACHbVrXyAAAKOUlEQVR4nO2d63LjKgyAYxvwPVfbSeykubZNNm3P+7/dsZNut20CBgnbbYZvZv/sdAgyICQhRK9nMBgMBoPBYDAYDAaDwWAwGAwGg8FgMPxE/DjLhsMsi/2ue6KXOJvOi1E+SyzCvBJGrGSWj4r5NIu77huadDLOk8B23JARYn1ACAtdxw6SfDxJu+4jFD8tIhrQasC4lENa/klUpL9u0sbLxYk6IV+0z4QOPS2Wv2m6LkfM9gQDd2MoPZuNll33W47BzrUlh+7bQNrubtB172uZ5o4Lke6C6+TTriUQMp8FDC5eBQtm866l4OH3Laq08G5DqNX/kUr1YaVDvIuIq4eupbli+2xrEu8sov287VqiLwzXOsW7iLgedi3VP/qep1e8Cs/rdy3XO4O9rV+8Cnv/I7bFPkXuDHxC2v0gxlFDw3fBjjo2UbesgdX3GY91qk6fdG19fAh96k6+RdC0eBXBoiPx4o3ThnyW5Ww6WYjZquHl9w9vlbUv38AC7w6EuZQ6Kh4xs1rfEVM1j/2zeDRZF8djf7x3Hek2iNdybCp1ofLR2fHvihr25R0Q4rYqIVg+QosvDR2lJ3qrEg6g85OQ772M97LxG+K1tg4zCyofu3aB4pX0LLVa0qXxCqg/b4/BVtpaYKt29sMNdP8Lbgc+N9Lfy9u0Id8Car84L7cbnFP5Jlqw2p6g9ieZcVocyAtoBY1b3luF3nzrGy+kGycKOos27D3ForMiIeGa2+gfhTYJa1bRRGADO+AHyZ5VPpoXNSlfHxyf8Eb8VpUEtOwG4zQq6uAbjsAMUZmiJbQ5i2YP9pDYmt9qfFITkO2bkg8+Qa1AoPwy1caamqRDuAdPnkXtKk98r5mo/houoCP65lvlieGtm5BPvR//oCI/oK9u+9lNbPdqyvwL4aOo4Rf1M2/hlAfygBlA4XnmBvDlbO0npL60X3oDJvRUIZsrWek+5e7D93grFFpXA5B7ov3cCRqlqHCEeRNL0Kcjll75FJzSaw7CbWsHy6uherNNZogBrFF5Ecz+4/rPIKaYYySXE6q4EEMnP9eBhpBjTqmpsCcp9NuxXJ98A9Q5mSfcJObgtkUemCJAPXChZgm+gTITK9ydNgEx8lnuq7BtRWfwS8u65FuiEimoMM91gPh4tq4M2hF4Fp0FFC7BB4yFJIjzqBCjEn3Is9BqHGPOwTWFEHEzNHwTNo6x4XXN0QUq2UDozPeyA6ZtT8tRhY/Qc1ad833E2LgWOelwmlJUH6yDcJ2glmCpwHQcaxcoM4Ykwsb3uFQwpxC2LkeE2iTEqjzDzY4aV1oSXB/EdgxuCZZQvHxga/+9B0JN/oLNBgvwi3CC+8hikx/jR5+hE7SAOD1HLJESHX4YooQQxsJ3WMi+3DYU4I3RAqJ83Rpf6XhwHWoHgWudZvs8itZvo4r1Oto8J05A6/Op8F6v0gH6NYKD65L+uOgfp4Msi6+u9fpxlk52tfl6JMGao1m9jmFuNQrBofxnU+q4XljdZ73MMRe5UQ2fiHiXCrDZT9MaS5s4Xr572FajkA3T7fI4f315i/L97JSwcv79hw6xx7lQQhsbeqoJmdCkf/sT+vH5TvkQ79BkQgHFQWUJCpHHzdw2MuKFx1rYNSD05sNZG/enhsIRRHv1gl3C2zeXkzPcTrfpMPbjwYPYGEDvE/zm2awR+eL0abE6BLZdaubD4RDUJD2jI/j8bZDqn5/x8nVj2U6oktoldsdq8bkt675xM1yO95S66rlwOKc+5v0e3oT4xHAyTgIKSwQnuH5kPB3DhHkFCgwmb38coHDnjuBMmYznS2jxpdP+qBw5lSV3jfhopxZudhM6C8B/emRUSZ9wBMTpOn76ljjeWc/0P1SsR5eA3CnKzaGXBRkw/CBECihwd+kOMUtReTefQSoZ7jZR4ZyewDo61XW3GblN8Df6c+NOsJ7ADpKftN0eRSq7uohFSN1VVDxsv0QdKmcwXU6KNV94dMDwHaypJhPYI2EVs3CT2T5/LMn3zytCg6C0uw58ARG5i19/HGtsywfVzpG/CvIR8hOocF1LEO0u4Y6vuRoOloF3A7TDKwxZ1EBOXA03xR5K/AUdsoDn6ZQC/uE2q02JooNOdWFDoYD8sLYuOwYfNpQI/PIF5N/gAKYYXoMO/GJC94R7YdNHHyv9/Qm83404fOGr8FjXEtSQcohYLfxf17ZLaDg+QxyA8gWE5WnfQMMBKOIImy/gRNcU1XCEjUhCYFwlI2s+1KoiDUkIiDQSvhaVyw4jSV0ajZbQFzwRiL8PPsqoZkJ2dSOoJREInsrFt2RkEpxIuKy9+6ollQuejMcPLUrc2iVkULs49CTjwdMpuWaGxDcLk+y1duroSadEJMTyQnr19p+3ipf1+5OmhFh4SjPvQnjttWR3Hw8kig7pqooA9up5ybBZTd9p1PMlbvzoSkqHz1GeN1ojoF0amLnEwtd2rQB8MYSXSymeoodycxvL7E3aLoaAr/bwMu5FSoY45bgUMgawxqs90MtZZMVpkL9NeKdy75ZQoJbWy1lgr/fAaY8b9qVVnUa5qm06r9eBL0jy1CgvJBNUdymHcufZWi9IQlNzeWr09eaiZvTYk65qpveKK/SSMm+nupmMTp8rw8eXLJWn+ZIy8Jo5z9y+EXQi9uWq70ZOY+u+Zg4tFBBwNN2Vo+AklyUVSe5I2gsFAI+ceUcH37QWC14uQ72W3JD0l3oAFuvgOvWPn0wxYufvjqusfA0U64AeWfJ24yz5OxeZvTq+/+dIdh00UW4FWDCHa0/F0cFloUft/MNkjqTXeSMFc2Alj0jIbS99jR4Xk38+cSRtEDZT8ghYtEo29uzn8gZvQ0WrYGXHJC2ObCbvsTRXG0+6Hu9npIZwkMib82FjheNgpf+IRKrOUqXqs0436TugSerWHnEVgYJ8TRZvBJbfFNX9K/HfVD5bs+U3YQVUxfWj05NKQKTpAqqwErhMUO6hUHuTo+kSuMAixi4vvDDYqH2w5osYA8tQu/tbszR+UXwLro0y1MBC4qF1Nbf8vqUYjmynkDiwFDyxx1/UQ1wkqi/itFUKHlrM3w3G2/ceDh+iQP41jXdaK+YPf47Bs0/56GXx+Mel6kZfi88xYB7UKF3AEFSM/Lc8GQKlZfkwj9rA5Gv7URvUs0TqdPAs0f0/LHX/T4P17v5xt979P893/w8s3v8Tmb3q3EnPVc4bhNhrpnq492dqe3f/0HDv/p+K7t39Y98Vd/5ce+8cY9EhIqFWX/v5tC7mM8Uw2RUsmGnOD9HMNHcQVypdJ9eav9QIg51rg7b+0HZ3P2Xjq2E5Yraax088m4205be2QLxcnKgjOZChQ0+LZfdGpyJ+WkQ0oJ4ohkaYV/5JVKQ/Vm3WkU7GeRLYjht+KahJCAtdxw6SfDxpPZqknTibzotRPkuqASsphzSZ5aNiPs1+3bQU45/LHWbZVa1Ng8FgMBgMBoPBYDAYDAaDwWAwGAwGg+Fn8D+DyKtrVG4ZLgAAAABJRU5ErkJggg=="
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Turner Cars
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-semibold text-xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
