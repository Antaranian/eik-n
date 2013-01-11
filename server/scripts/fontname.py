#!/usr/bin/python

"""
Export glyphs from a font file into a theme directory with each glyph
saved as its own svg file.
"""

import fontforge
import sys, os, optparse

from os import path

from pprint import pprint, pformat

def get_parser( ):
  parser = optparse.OptionParser( )
  return parser


class Inspector(object):
  def __init__(self, options, args):
    self.options = options
    self.args = args

  def run(self):
    for font in self.args:
      self.inspect(font)

  def inspect(self, name):
    font = fontforge.open(name)
    print font.fullname

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