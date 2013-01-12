#!/usr/bin/python

"""
Export glyphs from a font file into a theme directory with each glyph
saved as its own svg file.
"""

import fontforge
import sys, os, optparse

from os import path

from os.path import basename

from pprint import pprint, pformat

def get_parser( ):
  parser = optparse.OptionParser( )
  parser.add_option('-t', '--types',
                    default="ttf,svg,woff",
                    help="Include these types.")
  parser.add_option('-p', '--path',
                    default="./",
                    help="Write glyphs to this directory.")
  parser.add_option('-n', '--name',
                    default="eicon",
                    help="Write glyphs to this directory.")
  return parser


class Inspector(object):
  def __init__(self, options, args):
    self.options = options
    self.args = args

  def run(self):
    for font in self.args:
      self.convert(font)

  def convert(self, filename):
    cwd = self.options.path
    name = self.options.name
    types = self.options.types.split(',')
    font = fontforge.open(filename)
    pprint(types)
    for ext in types:
      fpath = path.join(cwd, name + '.' + ext)
      font.generate(fpath)

def main(*args):
  parser = get_parser( )
  (options, args) = parser.parse_args(list(args))
  prog, args = args[0], args[1:]

  app = Inspector(options, args)
  app.run( )

if '__main__' == __name__:
  main(*sys.argv)

#####
# EOF