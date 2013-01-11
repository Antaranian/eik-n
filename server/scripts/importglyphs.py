#!/usr/bin/python
import fontforge

import sys, os, optparse

from os import path

from os.path import basename

from pprint import pprint, pformat

def get_parser( ):
  parser = optparse.OptionParser( )
  parser.add_option('-n', '--name',
                    default="Eicon",
                    help="Set font name")
  parser.add_option('-p', '--path',
                    default="./",
                    help="Write fonts to this directory.")
  parser.add_option('-g', '--glyphs',
                    default="./",
                    help="Write fonts to this directory.")
  return parser



# # create empty font
# font = fontforge.font()

# # set font names
# font.fontname = "FooBar"
# font.fullname = "Foo Bar"
# font.familyname = "Foo Bar"

# # import svgs
# for i in range(1, 701):
#     # create a new glyph with the code point i
#     glyph = font.createChar(i)

#     # import svg file into it
#     glyph.importOutlines("%s.svg" %i)

#     # make the glyph rest on the baseline
#     ymin = glyph.boundingBox()[1]
#     glyph.transform([1, 0, 0, 1, 0, -ymin])

#     # set glyph side bearings, can be any value or even 0
#     glyph.left_side_bearing = glyph.right_side_bearing = 10

# font.generate("foobar.ttf") # truetype

class Inspector(object):
  def __init__(self, options, args):
    self.options = options
    self.args = args

  def run(self):
  	pprint(self.options)
  	pprint(self.args)
    # for font in self.args:
    #   self.convert(font)

  # def convert(self, name):
  #   font = fontforge.open(name)
  #   types = self.options.type.split(',')
  #   cwd = self.options.path
  #   name = basename(path.splitext(name)[0])
  #   for type in types:
  #     fpath = path.join(cwd, name + '.' + type)
  #     font.generate(fpath)

def main(*args):
  parser = get_parser( )
  (options, args) = parser.parse_args(list(args))
  prog, args = args[0], args[1:]
  pprint(options)
  app = Inspector(options, args)
  app.run( )

if '__main__' == __name__:
  main(*sys.argv)